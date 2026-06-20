import LanguagePicker from '~/components/LanguagePicker';
import Title from '~/components/Title';

function TopBar() {
  return (
    <div className="flex w-full flex-row justify-between gap-2">
      <Title />
      <LanguagePicker />
    </div>
  );
}

export default TopBar;
