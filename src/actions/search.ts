import { IAxiosAction } from "../interfaces/axios";

const SEARCH_URL = process.env.SEARCH_URL;

export const SEARCH_GET = "search/get";

export function searchQuery(search: string): IAxiosAction {
  return {
    type: SEARCH_GET,
    config: {
      method: "GET",
      url: `${SEARCH_URL}/employee`,
    },
  };
}
