import Container from "@/component/shared/Container";
import { TMenu } from "@/types/menu";
import { getMenus } from "@/services/menuService";
import MenuFilter from "@/component/menu/MenuFilter";


const MenuPage = async () => {
  const menus: TMenu[] = await getMenus();

  const categories = ["All", ...Array.from(new Set(menus.map(item => item.category)))];

  return (
    <main className="min-h-screen bg-base-100 transition-colors duration-500 pb-20">
      {/* --- Header Section --- */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-base-300 border-b border-base-content/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-[50%] h-[150%] bg-secondary/10 rounded-full blur-[100px]"></div>
        </div>
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8">
            <div className="text-center lg:text-left space-y-2">
              <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Full Menu
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-base-content tracking-tighter">
                Discover <span className="text-primary italic font-serif">Flavors</span>
              </h1>
              <p className="max-w-md text-base-content/50 text-sm lg:text-base font-medium">
                Experience the perfect blend of seasonal ingredients and culinary expertise.
              </p>
            </div>

            {/* Stats */}
            <div className="hidden lg:flex gap-10">
              <div className="text-center">
                <p className="text-3xl font-black text-primary">{menus.length}</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Items</p>
              </div>
              <div className="w-px h-12 bg-base-content/10"></div>
              <div className="text-center">
                <p className="text-3xl font-black text-primary">{categories.length - 1}</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Categories</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- Client-side Filter Component --- */}
      <MenuFilter menus={menus} categories={categories} />
    </main>
  );
};

export default MenuPage;
