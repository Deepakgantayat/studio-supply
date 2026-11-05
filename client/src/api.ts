import type { Product } from './types';
const request = async <T,>(path:string):Promise<T> => { const r=await fetch(`/api${path}`); if(!r.ok) throw new Error('We could not load the catalogue. Please try again.'); return r.json(); };
export const getProducts=()=>request<Product[]>('/products');
export const getProduct=(id:number)=>request<Product>(`/products/${id}`);
export const getCategories=()=>request<string[]>('/categories');
export const submitEnquiry=async (data:{productId:number;name:string;email:string;phone:string;message:string})=>{const r=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); const body=await r.json(); if(!r.ok) throw new Error(body.error||'Your enquiry could not be sent.'); return body;};
