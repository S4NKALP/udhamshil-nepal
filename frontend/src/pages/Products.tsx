import { Link } from "react-router-dom";
import { LightField, Reveal } from "@/components/site/Parallax";
import { PageHero } from "@/components/site/PageHero";
import { useApi } from "@/hooks/useApi";

export default Products;

interface ProductFeature {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  image: string | null;
  features?: ProductFeature[];
}

function Products() {
  const { data: products, loading } = useApi<Product[]>("products");

  if (!loading && (!products || products.length === 0)) {
    return null;
  }

  return (
    <div className="relative">
      <LightField />
      <PageHero
        eyebrow="Catalogue"
        title="Equipment for every"
        highlight="scale of work"
        description="From a single bench unit to a fully automated line — sourced, manufactured and supported by our team in Banke."
      />

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-32">
          <div className="flex flex-col gap-0 border-t border-border">
            {products?.map((product, i) => (
              <Reveal key={product.id} delay={i * 80}>
                <div className="group grid items-center gap-12 border-b border-border py-16 transition-colors hover:bg-muted/30 md:grid-cols-12">
                  {product.image && (
                    <div className="md:col-span-6 overflow-hidden bg-muted aspect-[4/3]">
                      <img
                        src={product.image}
                        loading="lazy"
                        alt={`${product.name} machinery`}
                        className="w-full h-full object-cover grayscale transition duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="md:col-span-6 md:pl-8">
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 block">
                      0{i + 1}
                    </span>
                    <h2 className="text-4xl font-display font-black tracking-tighter uppercase text-foreground md:text-5xl">
                      {product.name}
                    </h2>
                    {product.features && product.features.length > 0 && (
                      <ul className="mt-8 grid gap-4 text-sm font-medium uppercase tracking-widest text-muted-foreground sm:grid-cols-2">
                        {product.features.map((feature) => (
                          <li key={feature.id} className="flex items-start gap-4">
                            <span className="text-foreground">—</span>
                            <span>{feature.name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link
                      to="/contact"
                      className="mt-12 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-background bg-foreground px-8 py-4 hover:bg-foreground/80 transition-colors"
                    >
                      Request pricing
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
