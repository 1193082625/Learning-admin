import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

{/* <div className="flex">
  <span onClick={() => router.back()}>{`<`}</span>
  <h1 className="text-lg font-bold">文章页</h1>
</div> */}
export default function LBreadcrumbs() {
  return (
    <Breadcrumbs className="h-12 flex items-center">
      <BreadcrumbItem href="/docs/components/button">Button</BreadcrumbItem>
      <BreadcrumbItem href="/docs/components/breadcrumbs">Breadcrumbs</BreadcrumbItem>
      <BreadcrumbItem href="/docs/components/card">Card</BreadcrumbItem>
      <BreadcrumbItem href="/docs/components/checkbox">Checkbox</BreadcrumbItem>
      <BreadcrumbItem href="/docs/components/code">Code</BreadcrumbItem>
    </Breadcrumbs>
  )
}