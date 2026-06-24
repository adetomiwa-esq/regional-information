import axios from "axios";

const API =
  "https://regional-info-api.onrender.com/api/region";

export const getRegion = async () => {
  const response = await axios.get(API+"/get-regions");
  console.log(response.data.regions);
  

  return response.data.regions[0];
};

export const updateRegion = async (
  id: string,
  payload: any
) => {
  return axios.put(
    `${API}/edit-refion/${id}`,
    payload
  );
};