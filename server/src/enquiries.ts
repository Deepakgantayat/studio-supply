import { mkdir, appendFile } from 'node:fs/promises'; import { dirname } from 'node:path'; import nodemailer from 'nodemailer'; import type { Enquiry,Product } from './types.js';
export interface EnquiryDelivery { send(enquiry:Enquiry,product:Product):Promise<void>; }
export class LocalEnquiryDelivery implements EnquiryDelivery {
 constructor(private path='server/data/enquiries.json',private smtpHost=process.env.SMTP_HOST,private smtpPort=Number(process.env.SMTP_PORT||1025),private salesInbox=process.env.SALES_INBOX||'sales@example.test'){}
 async send(enquiry:Enquiry,product:Product){
  if(this.smtpHost){const transport=nodemailer.createTransport({host:this.smtpHost,port:this.smtpPort,secure:false,auth:process.env.SMTP_USER?{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}:undefined});await transport.sendMail({from:enquiry.email,to:this.salesInbox,subject:`Product enquiry: ${product.title}`,text:`${enquiry.name} (${enquiry.email}, ${enquiry.phone}) asked about ${product.title}.\n\n${enquiry.message}`});return;}
  await mkdir(dirname(this.path),{recursive:true});await appendFile(this.path,JSON.stringify({...enquiry,productTitle:product.title})+'\n','utf8');
 }
}
