import { useCallback, useState, MouseEvent } from "react";

interface UsePopover {
  open: HTMLElement | null;
  onOpen: (event: MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export function usePopover(): UsePopover {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const onOpen = useCallback((event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setOpen(null);
  }, []);

  return {
    open,
    onOpen,
    onClose,
    setOpen,
  };
}
