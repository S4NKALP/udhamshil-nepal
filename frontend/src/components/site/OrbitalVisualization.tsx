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
  

  const RADIUS = {
    mobile: 140,
    desktop: 220,
  };

  return (
    <div className="relative mx-auto flex h-[500px] w-full max-w-3xl items-center justify-center overflow-hidden lg:h-[600px]">
      {/* Background Orbit Rings */}
      <div className="absolute h-[280px] w-[280px] rounded-full border border-dashed border-border/40 lg:h-[440px] lg:w-[440px]" />
      <div className="absolute h-[180px] w-[180px] rounded-full border border-border/20 lg:h-[260px] lg:w-[260px]" />

      {/* Central Node */}
      <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-brand/30 bg-background shadow-[0_0_40px_rgba(var(--brand-rgb),0.15)] lg:h-32 lg:w-32">
        <div className="absolute inset-0 rounded-full animate-ping bg-brand/10 opacity-75" style={{ animationDuration: '3s' }} />
        {org?.logo ? (
          <img src={org.logo} alt={org?.name || "Organization"} className="h-12 w-12 lg:h-16 lg:w-16 object-contain" />
        ) : (
          <span className="font-display text-3xl font-black text-foreground">{org?.name ? org.name.charAt(0) : "UN"}</span>
        )}
      </div>

      {/* Orbiting Nodes */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-20 h-0 w-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * 360;
          // Use standard trigonometry for positioning. 
          // 0 degrees is right (positive X).
          const rad = (angle * Math.PI) / 180;
          
          return (
            <React.Fragment key={node.id}>
              {/* Desktop position */}
              <motion.div
                className="absolute hidden -translate-x-1/2 -translate-y-1/2 md:block"
                style={{
                  x: RADIUS.desktop * Math.cos(rad),
                  y: RADIUS.desktop * Math.sin(rad),
                }}
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <NodeCard node={node} />
              </motion.div>

              {/* Mobile position */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 md:hidden"
                style={{
                  x: RADIUS.mobile * Math.cos(rad),
                  y: RADIUS.mobile * Math.sin(rad),
                }}
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <NodeCard node={node} />
              </motion.div>
            </React.Fragment>
          );
        })}
      </motion.div>
    </div>
  );
}

function NodeCard({ node }: { node: NodeData }) {
  const content = (
    <div className="group relative flex cursor-pointer items-center justify-center rounded-full border border-border/60 bg-card/80 p-1.5 shadow-lg backdrop-blur-md transition-all hover:border-brand hover:bg-card">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-accent">
        {node.logo ? (
          <img src={node.logo} alt={node.name} className="h-6 w-6 object-contain" />
        ) : (
          <Settings2 className="h-5 w-5" />
        )}
      </div>
      
      {/* Tooltip */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2.5 py-1.5 text-xs font-semibold text-background opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
        {node.name}
      </div>
    </div>
  );

  if (node.website_link) {
    return (
      <a href={node.website_link} target="_blank" rel="noreferrer" className="block outline-none hover:scale-110 transition-transform">
        {content}
      </a>
    );
  }

  return <div className="hover:scale-110 transition-transform">{content}</div>;
}
