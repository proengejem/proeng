import { useSpring, animated } from "react-spring";
import { useState, useEffect, useRef } from "react";

interface NumeroProps {
  n: number; // 'n' é um número genérico, não fixo
}

export default function Numero({ n }: NumeroProps) {
  const [startAnimation, setStartAnimation] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) { // Usando optional chaining
          setStartAnimation(true);
        }
      },
      { threshold: 0.5 } // Define que a animação começa quando 50% do elemento está visível
    );

    ref.current && observer.observe(ref.current); // Usando && ao invés de if para ser mais conciso

    return () => {
      ref.current && observer.unobserve(ref.current); // Usando && novamente
    };
  }, []);

  const { numero } = useSpring({
    from: { numero: 0 },
    to: { numero: startAnimation ? n : 0 }, // Inicia a animação quando `startAnimation` for verdadeiro
    config: { mass: 1, tension: 20, friction: 10 },
    delay: 200,
  });

  return (
    <animated.span ref={ref}>
      {numero.to((val) => val.toFixed(0))}
    </animated.span>
  );
}
