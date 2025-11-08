type FilterLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function Layout({ children, sidebar }: FilterLayoutProps) {
  return (
  <section>
      <aside >
        {sidebar}
      </aside>
      <main >{children}</main>
    </section>
  );
}