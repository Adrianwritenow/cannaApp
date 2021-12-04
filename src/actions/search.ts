import { IAxiosAction } from "../interfaces/axios";

const SEARCH_URL = process.env.SEARCH_URL;

export const SEARCH_POST = "search/post";

export function searchQuery(value: string): IAxiosAction {
  const { search } = value;

  const data = JSON.stringify({
    query: {
      match_all: {},
    },
  });

  return {
    type: SEARCH_POST,
    config: {
      method: "POST",
      url: `${SEARCH_URL}/`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: data,
    },
  };
}
