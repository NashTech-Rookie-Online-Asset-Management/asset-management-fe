import DynamicLogo from '@/components/custom/dynamic-logo';
import { ModeToggle } from '@/components/custom/mode-toggle';
import NashTechLogo from '@/components/custom/nashtech-logo';

function PublicHeader() {
  return (
    <div className="w-full bg-primary">
      <div className="container mx-auto flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <DynamicLogo className="size-12 p-1" />
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
