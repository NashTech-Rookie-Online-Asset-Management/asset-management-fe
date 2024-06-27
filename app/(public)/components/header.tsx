import { ModeToggle } from '@/components/custom/mode-toggle';
import NashTechLogo from '@/components/custom/nashtech-logo';

function PublicHeader() {
  return (
    <div className="w-full bg-primary">
      <div className="container mx-auto flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <div className="aspect-square size-12 bg-white p-1">
            <NashTechLogo className="size-full" />
          </div>
          <h1 className="text-base font-bold text-primary-foreground md:text-xl">
            Online Asset Management
          </h1>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default PublicHeader;
