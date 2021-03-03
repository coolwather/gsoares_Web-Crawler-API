const puppeteer = require('puppeteer')

const Site = require('../../models/Site')
const Hq = require('../../models/Hq')

class HqDragonService {
	static async GetHqs() {
		const site = await Site.findOne({
			where: { url: 'https://hqdragon.com/hqs' },
		})

		if (site) {
			const browser = await puppeteer.launch()
			const page = await browser.newPage()

			let pageNumber = 1
			let go = true

			console.log(`Crawling hqs from ${site.name} on ${new Date()}`)
			console.log('Getting all Hqs links on website')

			while (go) {
				console.log(`Gettinh Hqs from page ${pageNumber}`)

				// Go to the pae of the link
				page.goto(site.url + '/' + pageNumber)
				await page.waitForNavigation({
					waitUntil: 'networkidle0',
					timeout: 0,
				})

				// Get all Hqs links on page
				const links = await page.$$eval(
					'.col-6.col-sm-6.col-md-3 > a:nth-child(2)',
					(as) => as.map((a) => a.href.trim())
				)

				console.log(`Page: ${pageNumber}, Hqs founded: ${links.length}`)

				// If the page have´t any link exit loop
				if (links.length === 0) {
					go = false
				} else {
					// For each link create a new link objet and if the link not exists in JSON
					// insert the new link in json file
					links.forEach(async (link) => {
						const hq = await Hq.findOne({where: {url: link}})

                        if(!hq) {
                            const newHq = Hq.build({
                                url: link
                            })

                            await newHq.save()

                            site.qtdHqs += 1

                            await site.save()
                        }
					})
				}

				// Increments the page number
				pageNumber++
			}

			console.log(`End of: Getting all Hqs links on website`)

			browser.close()
		} else {
			throw { errorCode: 'HqDragon_001', message: 'Site não encontrado' }
		}
	}
}

module.exports = HqDragonService
