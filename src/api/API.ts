import { IForecast, IPlaces } from "@/models/Models";

export async function fetchPlaces(
  url: string
): Promise<{ data: IPlaces[]; errorMessage: string }> {
  const response = await fetch(url);

  try {
    if (response.ok) {
      const data = await response.json();

      return { data, errorMessage: "" };
    } else {
      throw new Error();
    }
  } catch {
    const errorMessage = "Oops.. something went wrong";

    return { data: [], errorMessage };
  }
}

export async function fetchForecast(
  url: string
): Promise<{ data?: IForecast; errorMessage?: string }> {
  const response = await fetch(url);

  try {
    if (response.ok) {
      const data = await response.json();

      return { data };
    } else {
      throw new Error();
    }
  } catch {
    const errorMessage = "We could not find this location";

    return { errorMessage };
  }
}
