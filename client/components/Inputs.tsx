import InputField from "@/components/InputField";
import WordField from "@/components/WordField";

const Inputs = () => {
  return (
    <>
      <h2 className='text-xl pt-2 pb-6 font-bold text-transparent bg-gradient-to-tr from-primary to-secondary bg-clip-text text-center'>Essentials:</h2>
      <InputField title="Enter the title for story thumbnail:" label="title"/>
      <InputField title="Enter the description for story thumbnail:" label="description"/>
      <WordField title="Add the tags or keywords the story is related to (eg: knife, drugs):" type="tags" label="keywords"/>
      <WordField title="Link the articles & references related to the story (Copy paste the url):" type="url" label="references"/>
    </>
  );
};

export default Inputs;
