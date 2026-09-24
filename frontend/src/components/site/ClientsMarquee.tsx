import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COLUMNS = 4;

interface Partner {
  id: number;
  name: string;
  logo: string | null;
}

export function ClientsMarquee({
  partners,
}: {
  partners: Partner[];
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (partners.length <= COLUMNS) return;
    const id = setInterval(() => {
      setStep((s) => (s + 1) % partners.length);
    }, 2500);
    return () => clearInterval(id);
  }, [partners.length]);

  if (partners.length === 0) return null;

  const visible: (Partner | null)[] = [];
  for (let i = 0; i < COLUMNS; i++) {
    visible.push(partners[(step + i) % partners.length]);
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
      {visible.map((client, i) => (
        <div key={`slot-${i}`} className="relative flex h-40 items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {client && (
              <motion.div
                key={client.id}
                layoutId={`client-slot-${i}`}
                className="flex flex-col items-center justify-center text-center gap-4 w-full"
                initial={{ opacity: 0, filter: "blur(8px)", scale: 0.92 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(8px)", scale: 1.08 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-mist shadow-sm">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-accent">{client.name.charAt(0)}</span>
                  )}
                </div>
                <span className="truncate w-full text-xs font-bold uppercase leading-snug tracking-wide text-foreground">
                  {client.name}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
