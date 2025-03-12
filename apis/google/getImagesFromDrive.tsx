import { google } from "googleapis";

async function getImagesFromDrive(credentials: any) {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  const drive = google.drive({ version: "v3", auth });

  const response = await drive.files.list({
    q: "mimeType = 'image/jpeg' or mimeType = 'image/png'", // Filtra por tipos de imagen
    fields: "nextPageToken, files(id, name, webViewLink)", // Obtiene los campos necesarios
  });

  if (response.data && response.data.files && response.data.files.length) {
    const files = response.data.files;
    const images = files.map((file) => {
      return {
        id: file.id,
        name: file.name,
        url: file.webViewLink, // URL de descarga de la imagen
      };
    });
    return images;
  } else {
    return [];
  }
}

export default getImagesFromDrive;
