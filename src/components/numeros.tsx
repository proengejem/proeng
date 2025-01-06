import { useSpring, animated } from "react-spring";
import { useState, useEffect } from "react";

interface NumeroProps {
  n: number; // 'n' é um número genérico, não fixo
}

export default function Numero({ n }: NumeroProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(Date.now()); // Atualiza a chave com o timestamp atual
  }, []);

  const { numero } = useSpring({
    from: { numero: 0 },
    to: { numero: n },
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  return (
    <animated.span key={key}>
      {numero.to((val) => val.toFixed(0))}
    </animated.span>
  );
}
