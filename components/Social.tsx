import { FaGithub, FaLinkedin, FaStackOverflow } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/hbsoftco", label: "GitHub" },
  { icon: <FaLinkedin />, path: "https://linkedin.com/in/hbsoftco", label: "LinkedIn" },
  { icon: <FaStackOverflow />, path: "https://stackoverflow.com/users/4308163/hossein-bajan", label: "Stack Overflow" },
];

interface SocialProps {
  containerStyles?: string;
  iconStyles?: string;
}

const Social = ({ containerStyles, iconStyles }: SocialProps) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <a href={item.path} key={index} className={iconStyles} aria-label={item.label} target="_blank" rel="noopener noreferrer">
            {item.icon}
          </a>
        );
      })}
    </div>
  );
};

export default Social;
