import React from "react";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { useApi } from "@/hooks/useApi";

interface NodeData {
  id: number;
  name: string;
  logo: string | null;
  website_link: string;
}

interface Organization {
  id: number;
  name: string;
  logo: string | null;
}

export function OrbitalVisualization({ nodes }: { nodes: NodeData[] }) {
  const { data: org } = useApi<Organization>("org/organization");

  // On desktop, radius is 430, box is 940, icon is 80
  // On mobile, radius is 140, box is 320, icon is 50
  const RADIUS = { desktop: 430, mobile: 140 };
  const BOX = { desktop: 940, mobile: 320 };
  const ICON = { desktop: 80, mobile: 50 };

  return (
    <div className="relative mx-auto flex w-full flex-col items-center justify-center overflow-hidden">
      
      {/* Desktop Orbit */}
      <div className="relative z-0 hidden w-full max-w-[1000px] flex-col items-center justify-center overflow-clip h-[505px] md:flex">
        <div className="absolute left-1/2 top-0 -translate-x-1/2" style={{ width: BOX.desktop, height: BOX.desktop }}>
          {/* Dashed track */}
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-muted-foreground/30" 
            style={{ width: RADIUS.desktop * 2, height: RADIUS.desktop * 2 }} 
          />
          <motion.div 
            className="h-full w-full"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          >
            {nodes.map((node, i) => {
              const rad = ((i * 360) / nodes.length - 90) * (Math.PI / 180);
              const x = BOX.desktop / 2 + RADIUS.desktop * Math.sin(rad) - ICON.desktop / 2;
              const y = BOX.desktop / 2 - RADIUS.desktop * Math.cos(rad) - ICON.desktop / 2;
              return (
                <motion.div
                  key={node.id}
                  className="absolute flex items-center justify-center overflow-clip rounded-full bg-background shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)] ring-1 ring-border p-3"
                  style={{ left: x, top: y, width: ICON.desktop, height: ICON.desktop }}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                >
                  <NodeCard node={node} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
        {/* Central Logo */}
        <div className="relative mt-[110px] flex max-w-[520px] flex-col items-center gap-[30px]">
          <span className="relative flex size-[130px] items-center justify-center rounded-full bg-background shadow-[0_12px_30px_rgba(0,0,0,0.1)]">
            <span aria-hidden className="absolute -inset-6 rounded-full ring-1 ring-border/50" />
            <span aria-hidden className="absolute -inset-12 rounded-full ring-1 ring-border/30" />
            {org?.logo ? (
              <img src={org.logo} alt={org?.name || "Organization"} className="size-[55%] object-contain" />
            ) : (
              <span className="font-display text-4xl font-black text-foreground">{org?.name ? org.name.charAt(0) : "UN"}</span>
            )}
          </span>
        </div>
      </div>

      {/* Mobile Orbit */}
      <div className="relative z-0 flex w-full flex-col items-center gap-[30px] md:hidden pt-8 pb-16">
        <div className="relative aspect-square w-full max-w-[340px]">
          <div className="absolute inset-0">
            {/* Dashed track */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-muted-foreground/30" 
              style={{ width: "80%", height: "80%" }} 
            />
            <motion.div 
              className="h-full w-full"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            >
              {nodes.map((node, i) => {
                const rad = ((i * 360) / nodes.length - 90) * (Math.PI / 180);
                const r = 40; // 40%
                const x = 50 + r * Math.sin(rad);
                const y = 50 - r * Math.cos(rad);
                return (
                  <motion.div
                    key={node.id}
                    className="absolute flex items-center justify-center overflow-clip rounded-full bg-background shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)] ring-1 ring-border p-2 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%`, width: ICON.mobile, height: ICON.mobile }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                  >
                    <NodeCard node={node} />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          
          {/* Central Logo Mobile */}
          <span className="absolute inset-0 m-auto flex size-20 items-center justify-center rounded-full bg-background shadow-[0_12px_30px_rgba(0,0,0,0.1)]">
            <span aria-hidden className="absolute -inset-4 rounded-full ring-1 ring-border/50" />
            <span aria-hidden className="absolute -inset-8 rounded-full ring-1 ring-border/30" />
            {org?.logo ? (
              <img src={org.logo} alt={org?.name || "Organization"} className="size-[55%] object-contain" />
            ) : (
              <span className="font-display text-2xl font-black text-foreground">{org?.name ? org.name.charAt(0) : "UN"}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

function NodeCard({ node }: { node: NodeData }) {
  const content = (
    <div className="group relative flex h-full w-full cursor-pointer items-center justify-center transition-transform hover:scale-110">
      {node.logo ? (
        <img src={node.logo} alt={node.name} className="size-full object-contain" />
      ) : (
        <Settings2 className="h-5 w-5 text-muted-foreground" />
      )}
      
      {/* Tooltip */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-background opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
        {node.name}
      </div>
    </div>
  );

  if (node.website_link) {
    return (
      <a href={node.website_link} target="_blank" rel="noreferrer" className="block outline-none hover:-translate-y-1 transition-transform">
        {content}
      </a>
    );
  }

  return <div className="hover:-translate-y-1 transition-transform">{content}</div>;
}
