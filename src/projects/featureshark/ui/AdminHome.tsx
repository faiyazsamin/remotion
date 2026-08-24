import { AdminHomeBackdrop } from "./AdminHomeBackdrop";
import { AdminHomeComposer } from "./AdminHomeComposer";
import { AdminHomeHeadline } from "./AdminHomeHeadline";
import { AdminHomeHero } from "./AdminHomeHero";
import { AdminHomeMain } from "./AdminHomeMain";
import { AdminHomeSidebar } from "./AdminHomeSidebar";
import { AdminHomeSuggestions } from "./AdminHomeSuggestions";
import { AdminHomeTopBar } from "./AdminHomeTopBar";
import { AdminHomeWindow } from "./AdminHomeWindow";

/**
 * The whole `1.htm` clone assembled, with no motion. A scene that wants to
 * animate the page composes the same parts itself rather than wrapping this —
 * see `../AdminHomeScene.tsx`.
 */
export const AdminHome: React.FC = () => (
  <AdminHomeBackdrop>
    <AdminHomeSidebar />
    <AdminHomeWindow>
      <AdminHomeMain>
        <AdminHomeTopBar />
        <AdminHomeHero>
          <AdminHomeHeadline />
          <AdminHomeComposer />
          <AdminHomeSuggestions />
        </AdminHomeHero>
      </AdminHomeMain>
    </AdminHomeWindow>
  </AdminHomeBackdrop>
);
