
const InputField = ({ title }: { title: string }) => {
    return(
      <div className="w-[80%] py-6">
        <h2 className="text-lg pb-2">{title}</h2>
        <input className="w-full h-10 rounded-lg outline-primary px-4" />
      </div>
    )
}

export default InputField