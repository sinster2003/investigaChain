import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const metamaskAtom = atom({
    key: "metamaskAtom",
    default: "",
    effects_UNSTABLE: [persistAtom]
});