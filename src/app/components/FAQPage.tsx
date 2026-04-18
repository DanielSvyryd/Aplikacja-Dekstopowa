import { useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { faqItems, FAQItem } from "./mock-data";
import { useApp } from "../contexts/AppContext";
import { translations } from "../utils/translations";

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { language } = useApp();
  const t = translations[language];

  const categories = [
    { id: "all", label: t.allCategories },
    { id: "general", label: t.general },
    { id: "grades", label: t.gradesCategory },
    { id: "attendance", label: t.attendanceCategory },
    { id: "technical", label: t.technical },
    { id: "code-review", label: t.codeReviewCategory },
  ];

  const filteredFAQs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-foreground mb-2">{t.faqTitle}</h1>
        <p className="text-muted-foreground">{t.faqSubtitle}</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t.searchFaq}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div>
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No questions found matching your search.
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFAQs.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="text-foreground pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}
