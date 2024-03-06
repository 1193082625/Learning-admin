import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

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