export function createPageLabel(page: number, itemsPerPage: number, totalItems: number) {
  const startItem = (page * itemsPerPage);
  const endItem = Math.min((page + 1) * itemsPerPage, totalItems);
  return `${startItem + 1}-${endItem} of ${totalItems}`
}