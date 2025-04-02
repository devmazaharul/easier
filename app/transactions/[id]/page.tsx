"use client";
import Toppart from "@/app/components/Toppart";
import { useParams } from "next/navigation";
import ProductTable from "./productTable";

export default function Page() {
  const params = useParams();
  const slug = params.id?.toString(); // If your dynamic route is [id]

  return <div>
  <Toppart title='Product details' sortDesc='here the details of the product.'/>

  <div>
  <Toppart title='Product details' sortDesc='here the details of the product.'/>

<ProductTable productId={slug} />
</div>
</div>
}
