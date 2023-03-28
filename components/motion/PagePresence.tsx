import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
type Props = {
  children?: React.ReactNode;
};

const PagePresence = ({ children }: Props) => {
  const router = useRouter();
  return (
    <AnimatePresence
      initial={true}
      mode="wait"
      onExitComplete={() => window.scrollTo(0, 0)}
      custom={router.route}
    >
      {children}
    </AnimatePresence>
  );
};

export default PagePresence;
