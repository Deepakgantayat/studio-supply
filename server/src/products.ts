import type { Product } from './types.js';
export interface ProductSource { list():Promise<Product[]>; }
export class FakeStoreSource implements ProductSource {
  constructor(private baseUrl=process.env.PRODUCTS_API_URL??'https://fakestoreapi.com'){}
  async list():Promise<Product[]>{const response=await fetch(`${this.baseUrl}/products`);if(!response.ok)throw new Error(`Product source returned ${response.status}`);const data=await response.json() as Omit<Product,'featured'>[];return data.map((p)=>({...p,featured:[1,2,3,4,5].includes(p.id)}));}
}
export class ProductService {
  private cache:Product[]|null=null; private loadedAt=0;
  constructor(private source:ProductSource,private ttlMs=60_000){}
  async all(){if(!this.cache||Date.now()-this.loadedAt>this.ttlMs){this.cache=await this.source.list();this.loadedAt=Date.now();}return this.cache;}
  async find(id:number){return (await this.all()).find(p=>p.id===id)??null;}
}
