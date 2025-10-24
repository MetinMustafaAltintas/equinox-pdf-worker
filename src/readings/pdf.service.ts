import fs from "fs-extra";
import path from "node:path";
import { ReadingTypes } from '../readings/types/reading.types';
import { prepareBirthChartPdfContent } from './birth_chart';
import { prepareLoveConnectionPdfContent } from './love_connection';
import puppeteer, { PDFOptions } from 'puppeteer';
import { PDFDocument } from 'pdf-lib';

type TemplateConfig = {
	prepareContent: (raw: Record<string, any>) => Promise<any>;
};

const TEMPLATE_MAP: Record<string, TemplateConfig> = {
	[ReadingTypes.Birth_Chart]: {
		prepareContent: prepareBirthChartPdfContent,
	},
	[ReadingTypes.Love_Connection]: {
		prepareContent: prepareLoveConnectionPdfContent,
	},
};

interface PDFData {
	locale: string;
	assetsBasePath: string;
	metadata: Record<string, any>;
	common: Record<string, any>;
	pages: Record<string, Record<string, any>>;
}

export default class PDFService {
	
	static async startProcessing(type: ReadingTypes, additionalData: PDFData, onlyHtml?: boolean) {
		const config = TEMPLATE_MAP[type];

		if (!config) {
			throw new Error(`No PDF template configured for reading type: ${type}`);
		}
		const content = await config.prepareContent(additionalData);

		if (!content || content.type !== type) {
			throw new Error(`Invalid content generated for reading type: ${type}`);
		}

		console.log('content', content.pages);
		if (onlyHtml) {
			// content.pages.forEach((page: any) => {
			// 	fs.writeFileSync(path.join(__dirname, page.fileName.slice(0, page.fileName.length - 3) + ".html"), page.html);
			// });
			// const fileName = `${type.trim().toLowerCase()}.html`;
			// await fs.writeFile(path.join(__dirname, fileName), content);
			return content;
		}

		// Convert HTML content to PDF (assets are now embedded at compile time)
		const pdfBuffer = await this.htmlToPdf(content);

		return pdfBuffer;
	}

	static async htmlToPdf(content: any, options?: PDFOptions): Promise<Buffer> {
		const browser = await puppeteer.launch({
			headless: true,
			timeout: 50000,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});

		try {
			// Process each page individually for better memory management and error isolation
			const pagePdfs: Buffer[] = [];
			
			for (let i = 0; i < content.pages.length; i++) {
				const page = content.pages[i];
				const pageBuffer = await this.processSinglePage(browser, page, i, options);
				pagePdfs.push(pageBuffer);
			}

			// Combine all page PDFs into a single PDF
			return await this.combinePdfs(pagePdfs);
		} finally {
			await browser.close();
		}
	}

	/**
	 * Process a single page with its own browser page instance
	 */
	private static async processSinglePage(
		browser: any, 
		pageContent: any, 
		pageIndex: number, 
		options?: PDFOptions
	): Promise<Buffer> {
		let page: any = null;
		
		try {
			// Create a new page for each page content
			page = await browser.newPage();
			
			// Set page content with proper HTML structure
			const pageHtml = this.createSinglePageHtml(pageContent);
			
			await page.setContent(pageHtml, { 
				waitUntil: 'networkidle0', 
				timeout: 120000 
			});

			const pdfBuffer = await page.pdf({
				format: 'a4',
				timeout: 50000,
				printBackground: true,
				preferCSSPageSize: true,
				...options
			});

			console.log(`✅ Page ${pageIndex + 1} processed successfully`);
			return Buffer.from(pdfBuffer);
			
		} catch (error) {
			console.error(`❌ Error processing page ${pageIndex + 1}:`, error);
			throw new Error(`Failed to process page ${pageIndex + 1}: ${error}`);
		} finally {
			// Always close the page to free up memory
			if (page) {
				await page.close();
			}
		}
	}

	/**
	 * Create proper HTML structure for a single page
	 */
	private static createSinglePageHtml(pageContent: any): string {
  		const rawHtml = pageContent?.html;
  		if (typeof rawHtml === 'string' && rawHtml.trim().length > 0) {
    		return rawHtml;
  		}

  		const headContent =
    	pageContent?.head ??
    	pageContent?.htmlHead ??
    	'';
  		const bodyContent =
    	pageContent?.body ??
    	pageContent?.htmlBody ??
    	pageContent?.content ??
    	'';

  		const htmlAttributes = pageContent?.htmlAttributes || '';

  		return `<!DOCTYPE html>
		<html${htmlAttributes ? ' ' + htmlAttributes : ''}>
		<head>
  		<meta charset="UTF-8">
  		<meta name="viewport" content="width=device-width, initial-scale=1.0">
  		<title>Reading Report - Page</title>
  		${headContent}
		</head>
		<body>
  		${bodyContent}
		</body>
		</html>`;
	}

	/**
	 * Combine multiple PDF buffers into a single PDF using pdf-lib
	 */
	private static async combinePdfs(pdfBuffers: Buffer[]): Promise<Buffer> {
		try {
			if (pdfBuffers.length === 1) {
				return pdfBuffers[0];
			}

			// Create a new PDF document to merge all pages
			const mergedPdf = await PDFDocument.create();

			// Process each PDF buffer
			for (let i = 0; i < pdfBuffers.length; i++) {
				try {
					const pdf = await PDFDocument.load(pdfBuffers[i]);
					const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
					
					// Add each page to the merged PDF
					pages.forEach((page) => mergedPdf.addPage(page));
					
					console.log(`✅ Merged page ${i + 1}/${pdfBuffers.length}`);
				} catch (pageError) {
					console.error(`❌ Error merging page ${i + 1}:`, pageError);
					// Continue with other pages even if one fails
				}
			}

			// Generate the final merged PDF
			const mergedPdfBytes = await mergedPdf.save();
			console.log(`✅ Successfully merged ${pdfBuffers.length} pages into single PDF`);
			
			return Buffer.from(mergedPdfBytes);
		} catch (error) {
			console.error('❌ Error combining PDFs:', error);
			// Fallback: return the first page if merging fails
			console.warn('⚠️  PDF merging failed, returning first page as fallback');
			return pdfBuffers[0] || Buffer.alloc(0);
		}
	}

}
