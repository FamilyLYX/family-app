import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import * as XLSX from 'xlsx';
import { useEffect, useState } from 'react';

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => {
    async function getOrders() {
      const orders = collection(getFirestore(), 'orders');
      const q = query(orders, where('status', '==', 'created'));
      const data = await getDocs(q);
      const documents = data.docs.map((item) => {
        const data = item.data();
        const returnItem = {
          id: item.id,
          ...{ ...(data?.address?.value?.address ?? data?.address?.address) },
          name: data?.address?.value?.name ?? data?.address?.name,
          phone: data?.address?.value?.phone ?? data?.address?.phone,
          address: data.user,
          variant: data.variantId,
          // ...data,
        };
        return returnItem;
      });
      setOrders(documents);
    }
    getOrders();
  }, []);

  const saveToExcel = () => {
    const workBook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(orders);
    XLSX.utils.book_append_sheet(workBook, worksheet, 'Sheet1');
    XLSX.writeFile(workBook, 'data.xlsx');
  };
  return (
    <div>
      <h1>Admin</h1>
      <div>
        <div>Orders</div>
        <div>
          <button onClick={saveToExcel}>Download</button>
        </div>
      </div>
    </div>
  );
}
