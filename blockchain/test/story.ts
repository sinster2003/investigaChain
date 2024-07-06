// tests for story contract
import { expect } from "chai";
import hre from "hardhat";

describe("Story Contract tests", async () => {
    let retrievedStoryContract: any = null;

    beforeEach(async () => {
        const Story = await hre.ethers.getContractFactory("Story");
        const story = await Story.deploy();
        retrievedStoryContract = story;
    });

    it("add story test", async () => {
        const story = await retrievedStoryContract.addStory("6688539fe41c5e22f23d9e03", "0x6578616d706c6500000000000000000000000000000000000000000000000000", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
        
        expect(story).to.emit(story, "StoryAdded")
        .withArgs("6688539fe41c5e22f23d9e03", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    });

    it("get story test", async () => {
        // add the story
        await retrievedStoryContract.addStory("6688539fe41c5e22f23d9e03", "0x6578616d706c6500000000000000000000000000000000000000000000000000", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

        // get the story
        const retrievedStory = await retrievedStoryContract.getStory("6688539fe41c5e22f23d9e03");

        expect(retrievedStory.storyId).to.equal("6688539fe41c5e22f23d9e03");
        expect(retrievedStory.storyContent).to.equal("0x6578616d706c6500000000000000000000000000000000000000000000000000");
        expect(retrievedStory.authorId).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    });

    it("update story test", async () => {
        // add the story
        await retrievedStoryContract.addStory("6688539fe41c5e22f23d9e03", "0x6578616d706c6500000000000000000000000000000000000000000000000000", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

        // update the story
        const story = await retrievedStoryContract.updateStory("6688539fe41c5e22f23d9e03", "0x6578616d706c6500000000000000000000000000000000000000000000000000", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

        expect(story).to.emit(story, "StoryUpdated")
        .withArgs("6688539fe41c5e22f23d9e03", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    });
});