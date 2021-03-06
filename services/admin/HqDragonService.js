const puppeteer = require('puppeteer')

const Site = require('../../models/Site')
const Hq = require('../../models/Hq')
const Chapter = require('../../models/Chapter')

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
						const hq = await Hq.findOne({ where: { url: link } })
                        await new Promise(resolve => setTimeout(resolve, 1000))

						if (!hq) {
							const newHq = Hq.build({
								url: link,
								SiteId: site.id,
							})

							await newHq.save()
                            await new Promise(resolve => setTimeout(resolve, 1000))

							site.qtdHqs += 1

							await site.save()
                            await new Promise(resolve => setTimeout(resolve, 1000))
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

	static async GetAllHqsToUpdateDetail() {
		const hqs = await Hq.findAll({
			where: { detailed: false, SiteId: 1 },
			order: [['id', 'ASC']],
		})

		if (hqs) {
			return hqs
		} else {
			throw {
				errorCode: 'HqDragon_003',
				message: 'Nenhuma HQ pendente de atualização',
			}
		}
	}

	static async GetHqDetail(id) {
        const hq = await Hq.findByPk(id)
        await new Promise(resolve => setTimeout(resolve, 1000))
		const site = await Site.findByPk(1)
        await new Promise(resolve => setTimeout(resolve, 1000))

		try {

            if (hq) {
                console.log(`Begning download of HQ ${hq.url} in ${new Date()}`)
    
                const browser = await puppeteer.launch()
                const page = await browser.newPage()
    
                page.goto(hq.url)
                await page.waitForNavigation({
                    waitUntil: 'networkidle0',
                    timeout: 0,
                })
    
                // Get the HQ name
                const hqName = await page.$eval(
                    '.pb-3.mb-4.font-italic.border-bottom',
                    (el) => el.innerHTML.trim()
                )
                // Get the HQ cover
                const hqCoverUrl = await page.$eval('.img-fluid', (el) =>
                    el.src.trim()
                )
    
                // Get the HQ editor
                const hqEditor = await page.$eval(
                    '.col-md-8 > p:nth-child(2)',
                    (el) => el.innerHTML.substr(15).trim()
                )
                // Get the HQ year
                const hqYear = await page.$eval(
                    '.col-md-8 > p:nth-child(3)',
                    (el) => el.innerHTML.substr(11).trim()
                )
                // Get the HQ status
                const hqStatus = await page.$eval(
                    '.col-md-8 > p:nth-child(5) > span',
                    (el) => el.innerHTML.trim()
                )
                // Get the HQ description
                const hqDescription = await page.$eval(
                    '.col-md-8 > p:nth-child(6)',
                    (el) => el.innerText.substr(8).trim()
                )
    
                // HQ links of chapters
                const links = await page.$$eval(
                    'table > tbody > tr > td > a',
                    (as) => as.map((a) => a.href.trim())
                )
    
                hq.name = hqName
                hq.hqCoverUrl = hqCoverUrl
                hq.editor = hqEditor
                hq.year = hqYear
                hq.status = hqStatus
                hq.description = hqDescription
                hq.qtdHqs = links.length
                hq.dateUpdated = new Date()
                hq.detailed = true
    
                // For each link of chapter create a new Chapter object
                links.forEach(async (link) => {
                    const name = link.split('/')[link.split('/').length - 1]
                    console.log(`Getting data from Chapter: ${name} on ${new Date()}`)
                    const newChapter = Chapter.build({
                        name,
                        url: link,
                        HqId: hq.id,
                    })
    
                    await newChapter.save()
                    await new Promise(resolve => setTimeout(resolve, 1000))
                })

                await hq.save()
                await new Promise(resolve => setTimeout(resolve, 1000))
    
                site.qtdHqsDetailed++
                await site.save()
                await new Promise(resolve => setTimeout(resolve, 1000))
    
                console.log(`End download of HQ ${hq.name} in ${new Date()}`)
    
                browser.close()
            } else {
                throw { errorCode: 'HqDragon_002', message: 'HQ Não encontrada' }
            }
        } catch(error) {
            console.log(error)
        }
	}
}

module.exports = HqDragonService
