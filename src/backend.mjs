import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090/");

export async function getOffres() {
  try {
    let data = await pb.collection("maison").getFullList({
      sort: "-created",
    });

    data = data.map((a) => ({...a,img: a.image ? pb.files.getURL(a.image) : null,
    }));
    return data;
} catch (error) {
    console.error("Une erreur est survenue en lisant la liste des maisons",error
    );
    return [];
  }
}
