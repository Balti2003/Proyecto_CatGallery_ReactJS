//Encapsula urls y llamadas pequeñas a the cat api

const BASE_URL = "https://api.thecatapi.com/v1";

export const getCatsUrl = ({limit = 9, page = 0, mime_types, breed_ids} = {}) => {
    const params = new URLSearchParams();
    params.set("limit", limit);
    params.set("page", page);
    params.set("order", "Desc");
    if (mime_types) {
        params.set("mime_types", mime_types);
    }
    if (breed_ids) {
        params.set("breed_ids", breed_ids);
    }
    params.set("include_breeds", "1");
    params.set("has_breeds", "1");
    return `${BASE_URL}/images/search?${params.toString()}`;
};