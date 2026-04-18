import { useState } from "react";
import { HelpCircle, Mail, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useApp } from "../contexts/AppContext";
import { translations } from "../utils/translations";

export function SupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useApp();
  const t = translations[language];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-40"
        title={t.support}
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.support}</DialogTitle>
            <DialogDescription>
              {language === "en"
                ? "Get help with ProgressTrack or report an issue"
                : "Uzyskaj pomoc z ProgressTrack lub zgłoś problem"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <a
              href="https://support.atlassian.com/jira-service-management/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  {t.jiraHelpdesk}
                </span>
                <span className="text-xs text-muted-foreground">
                  {language === "en" ? "External" : "Zewnętrzny"}
                </span>
              </Button>
            </a>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                window.location.href = "mailto:support@progresstrack.edu";
              }}
            >
              <Mail className="w-4 h-4 mr-2" />
              {language === "en"
                ? "Email Support: support@progresstrack.edu"
                : "Email wsparcia: support@progresstrack.edu"}
            </Button>

            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-2">
                {language === "en" ? "Quick Help" : "Szybka pomoc"}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  •{" "}
                  {language === "en"
                    ? "Check the FAQ page for common questions"
                    : "Sprawdź stronę FAQ, aby znaleźć odpowiedzi na częste pytania"}
                </li>
                <li>
                  •{" "}
                  {language === "en"
                    ? "Contact your instructor for course-specific issues"
                    : "Skontaktuj się z wykładowcą w sprawie problemów związanych z kursem"}
                </li>
                <li>
                  •{" "}
                  {language === "en"
                    ? "For technical issues, use Jira Helpdesk"
                    : "W przypadku problemów technicznych skorzystaj z Jira Helpdesk"}
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
