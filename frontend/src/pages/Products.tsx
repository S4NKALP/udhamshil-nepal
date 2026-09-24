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
        <div className="mx-auto max-w-7xl space-y-12 px-6 pb-24">
          {products?.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <div className="group grid items-center gap-8 overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-lg transition-all hover:shadow-xl hover:shadow-brand/5 md:grid-cols-2 md:gap-12 md:p-10">
                {product.image && (
                  <div className="overflow-hidden rounded-2xl shadow-md">
                    <img
                      src={product.image}
                      loading="lazy"
                      width={1024}
                      height={768}
                      alt={`${product.name} machinery`}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">{product.name}</h2>
                  {product.features && product.features.length > 0 && (
                    <ul className="mt-8 grid gap-4 text-base text-muted-foreground sm:grid-cols-2">
                      {product.features.map((feature) => (
                        <li key={feature.id} className="flex items-center gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="font-medium">{feature.name}</span>
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
