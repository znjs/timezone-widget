import { AiFillLinkedin, AiFillTwitterCircle } from "react-icons/ai";
import { FaReact } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <p className="flex justify-center items-center my-2">
        made with &nbsp;
        <FaReact className="text-3xl text-blue-500" />
      </p>
      <div className="flex justify-center items-center text-3xl">
        <a href="https://twitter.com/jayasrikark" target="_blank" rel="noreferrer">
          <AiFillTwitterCircle className="text-[#1DA1F2]" />
        </a>
        &nbsp;
        <a href="https://www.linkedin.com/in/jayasrikark/" target="_blank" rel="noreferrer">
          <AiFillLinkedin className="text-[#0077b5]" />
        </a>
      </div>
    </div>
  );
}

export { Footer };
