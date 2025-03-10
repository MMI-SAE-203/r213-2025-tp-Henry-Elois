import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090/");

export async function getOffres() {
  try {
    let data = await pb.collection("maison").getFullList({
      sort: "-created",
    });

    data = data.map((a) => {
      a.img = pb.files.getURL(a, a.image);
      return a;
    });

    return data;
  } catch (error) {
    console.error(
      "Une erreur est survenue en lisant la liste des maisons",
      error
    );
    return [];
  }
}

export async function getOffre(id) {
  try {
    let data = await pb.collection("maison").getOne(id);
    data.imageUrl = pb.files.getURL(data, data.image);
    return data;
  } catch (error) {
    console.log("Une erreur est survenue en lisant la maison", error);
    return null;
  }
}

export async function getMaisonsParSurface(minSurface) {
  try {
    let records = await pb.collection("maison").getFullList({
      filter: `surface > ${minSurface}`,
    });
    records = records.map((a) => {
      a.img = pb.files.getURL(a, a.image);
      return a;
    });
    return records;
  } catch (error) {
    console.error("Erreur lors de la récupération des maisons :", error);
    return [];
  }
}

export async function addOffre(house) {
  try {
    await pb.collection("maison").create(house);
    return {
      success: true,
      message: "Offre ajoutée avec succès",
    };
  } catch (error) {
    console.log("Une erreur est survenue en ajoutant la maison", error);
    return {
      success: false,
      message: "Une erreur est survenue en ajoutant la maison",
    };
  }
}

export async function filterByPrix(prixMin, prixMax) {
  try {
    let data = await pb.collection("maison").getFullList({
      sort: "-created",
      filter: `prix >= ${prixMin} && prix <= ${prixMax}`,
    });
    data = data.map((maison) => {
      maison.imageUrl = pb.files.getURL(maison, maison.image);
      return maison;
    });
    return data;
  } catch (error) {
    console.log(
      "Une erreur est survenue en filtrant la liste des maisons",
      error
    );
    return [];
  }
}

export async function allAgents() {
  try {
    let data = await pb.collection("agent").getFullList({
      sort: "-created",
    });

    data = data.map((a) => {
      a.img = pb.files.getURL(a, a.image);
      return a;
    });

    return data;
  } catch (error) {
    console.error(
      "Une erreur est survenue en lisant la liste des maisons",
      error
    );
    return [];
  }
}

export async function allMaisonsByAgentsId(id) {
  const allRecord = await pb.collection("maison").getFullList({
    filter: `agent.id = '${id}'`,
    expand: "agent",
  });
  return allRecord;
}

export async function setFavori(house) {
  await pb.collection("maison").update(house.id, { favori: !house.favori });
}
