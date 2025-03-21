export function toEuro(amount : number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

export function formatDate(dateString : Date) {
  return new Date(dateString).toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
}).replace(',', '');  
}

export function getImagePath(imagePath : string){
  const cloudinaryBaseUrl = 'https://res.cloudinary.com'
  if(imagePath.startsWith(cloudinaryBaseUrl)){
    return imagePath
  } else {
    return imagePath = `/${imagePath}.webp`
  }
}