import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const StoryModule = buildModule("StoryModule", (m) => {
    const story = m.contract("Story");
    return {story};
});

export default StoryModule;