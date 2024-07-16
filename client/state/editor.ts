import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const editorAtom = atom({
    key: "editorAtom",
    default: {
        title: "",
        description: "",
        content: "# Crime Story",
        keywords: [],
        references: []
    },
    effects_UNSTABLE: [persistAtom]
});