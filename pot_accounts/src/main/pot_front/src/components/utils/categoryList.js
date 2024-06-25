import { useQuery } from "@tanstack/react-query";
import React from "react";
import QUERYKEYS from "./querykey";
import { loadCategory } from "../../api/accounts";

const useCategoryList  = (id) => {
    const queryFn = () => loadCategory(id);
    const { data } = useQuery([QUERYKEYS.LOAD_CATEGORY], queryFn);
    const list = data?.categories;
    return list;
}

export default useCategoryList;