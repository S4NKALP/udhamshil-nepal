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
        <div className="mx-auto max-w-7xl space-y-8 px-6 pb-24">
          {products?.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <div className="grid items-center gap-8 border-y border-border bg-background py-8 md:grid-cols-2">
                {product.image && (
                  <img
                    src={product.image}
                    loading="lazy"
                    width={1024}
                    height={768}
                    alt={`${product.name} machinery`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                )}
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">{product.name}</h2>
                  {product.features && product.features.length > 0 && (
                    <ul className="mt-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                      {product.features.map((feature) => (
                        <li key={feature.id} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {feature.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to="/contact"
                    className="mt-7 inline-block bg-ink px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-brand"
                  >
                    Request pricing
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
