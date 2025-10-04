import fs from "node:fs";
import path from "node:path";
import sizeOf from "image-size";

interface Painting {
  id: string;
  namePainting: string;
  imagePainting: string;
  width?: number;
  height?: number;
  [key: string]: any;
}

interface PaintingsData {
  data_painting: Painting[];
}

const dataFilePath = path.join(process.cwd(), "public/data/data.json");
const imagesDir = path.join(process.cwd(), "public/assets/paintings");

console.log("Iniciando o processamento de imagens com TypeScript...");

try {
  const jsonData: string = fs.readFileSync(dataFilePath, "utf-8");
  const data: PaintingsData = JSON.parse(jsonData);

  const updatedPaintings: Painting[] = data.data_painting.map((painting) => {
    if (painting.width && painting.height) {
      return painting;
    }

    const imagePath = path.join(imagesDir, painting.imagePainting);

    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);

      const dimensions = sizeOf(imageBuffer);

      console.log(
        `Processando: ${painting.imagePainting} -> ${dimensions.width}x${dimensions.height}`,
      );

      return {
        ...painting,
        width: dimensions.width,
        height: dimensions.height,
      };
    } else {
      console.warn(
        `AVISO: Imagem não encontrada para "${painting.namePainting}". Arquivo: ${painting.imagePainting}`,
      );
      return painting;
    }
  });

  const updatedData: PaintingsData = {
    data_painting: updatedPaintings,
  };

  fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2));

  console.log(
    "✅ Processamento concluído! O arquivo data.json foi atualizado com as dimensões das imagens.",
  );
} catch (error) {
  console.error("❌ Erro durante o processamento das imagens:", error);
}
