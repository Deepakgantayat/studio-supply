import 'dotenv/config';import {createApp} from './app.js';import {FakeStoreSource,ProductService} from './products.js';import {LocalEnquiryDelivery} from './enquiries.js';
const app=createApp(new ProductService(new FakeStoreSource()),new LocalEnquiryDelivery());const port=Number(process.env.PORT||4000);app.listen(port,()=>console.log(`Catalogue API listening on http://localhost:${port}`));
