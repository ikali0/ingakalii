/**
 * Portfolio Section Component
 * 
 * Gallery-style carousel showcasing AI ethics case studies
 * with image overlays and smooth navigation.
 */
import { Gallery4, Gallery4Item } from "@/components/ui/gallery4";
import { ScrollFade } from "./ui/scroll-fade";
import { ParallaxShape, TriangleShape, GradientMesh } from "./ui/abstract-shapes";

// Import project images
import ethicsDashboard from "@/assets/portfolio-ethics-dashboard.jpg";
import governance from "@/assets/portfolio-governance.jpg";
import stakeholder from "@/assets/portfolio-stakeholder.jpg";
import biasDetection from "@/assets/portfolio-bias-detection.jpg";
import decisionFramework from "@/assets/portfolio-decision-framework.jpg";
import tutoring from "@/assets/portfolio-tutoring.jpg";

/**
 * Gallery items adapted from project case studies
 */
const galleryItems: Gallery4Item[] = [
  {
    id: "ethics-dashboard",
    title: "AI Ethics Dashboard",
    description: "Interactive platform for monitoring and auditing AI systems for fairness, transparency, and accountability metrics.",
    href: "#",
    image: ethicsDashboard,
    problem: "Organizations lacked visibility into how their AI systems performed on fairness metrics, leading to undetected bias incidents and regulatory compliance risks.",
    approach: "Built a real-time monitoring dashboard with automated alerts for bias detection, integrated fairness metrics visualization, and audit trail logging for compliance.",
    outcome: "Reduced bias incidents by 40%, cut audit preparation time by 60%, and achieved SOC 2 compliance for 12 enterprise clients.",
    techStack: ["React", "Python", "TensorFlow Fairness", "PostgreSQL", "D3.js"],
  },
  {
    id: "governance-framework",
    title: "Governance Framework Tool",
    description: "Tool for organizations to create and implement AI governance policies with automated compliance checking.",
    href: "#",
    image: governance,
    problem: "Companies struggled to translate AI ethics principles into actionable governance policies, resulting in inconsistent implementation across teams.",
    approach: "Developed a policy template engine with customizable frameworks, automated compliance checks against industry standards (NIST, ISO), and team workflow integration.",
    outcome: "Cut policy creation time by 75%, achieved 95% compliance rate in audits, and deployed across 8 Fortune 500 companies.",
    techStack: ["TypeScript", "Node.js", "MongoDB", "AWS Lambda", "React"],
  },
  {
    id: "stakeholder-mapping",
    title: "Stakeholder Mapping",
    description: "Visual tool for mapping stakeholder interests, power dynamics, and potential conflicts in tech deployment.",
    href: "#",
    image: stakeholder,
    problem: "Tech deployments often failed due to overlooked stakeholder concerns, leading to costly rollbacks and damaged trust.",
    approach: "Created an interactive mapping tool with network visualization, conflict detection algorithms, and scenario planning features for proactive risk mitigation.",
    outcome: "Improved stakeholder alignment by 35%, reduced deployment conflicts by 50%, and accelerated project approvals by 3 weeks on average.",
    techStack: ["Vue.js", "Neo4j", "Python", "Cytoscape.js", "FastAPI"],
  },
  {
    id: "bias-detection",
    title: "Bias Detection API",
    description: "RESTful API service for detecting and measuring various types of bias in datasets and model outputs.",
    href: "#",
    image: biasDetection,
    problem: "Data scientists lacked standardized tools to measure bias across different fairness metrics, leading to inconsistent assessments.",
    approach: "Built a comprehensive API supporting 12+ fairness metrics (disparate impact, equalized odds, etc.) with detailed reporting and remediation suggestions.",
    outcome: "Supports 12+ fairness metrics, processes 1M+ predictions daily, and integrated into CI/CD pipelines of 25+ ML teams.",
    techStack: ["Python", "FastAPI", "scikit-learn", "Redis", "Docker"],
  },
  {
    id: "decision-framework",
    title: "Ethical Decision Framework",
    description: "Mobile-first application helping teams make ethical decisions under time pressure with structured frameworks.",
    href: "#",
    image: decisionFramework,
    problem: "Teams faced ethical dilemmas during critical decisions but lacked structured processes, leading to inconsistent outcomes.",
    approach: "Designed a mobile app with decision trees, ethical framework templates, and collaborative features for real-time team consensus building.",
    outcome: "Achieved 90% team adoption rate, reduced decision time by 40%, and improved ethical consistency scores by 65%.",
    techStack: ["React Native", "Firebase", "TypeScript", "Expo"],
  },
  {
    id: "tutoring-platform",
    title: "AI Tutoring Platform",
    description: "AI-powered tutoring platform providing personalized learning experiences and academic support services.",
    href: "https://studii.lovable.app",
    image: tutoring,
    problem: "Students lacked access to affordable, personalized tutoring that adapts to their individual learning pace and style.",
    approach: "Built an AI-driven platform with adaptive learning algorithms, real-time progress tracking, and personalized content recommendations.",
    outcome: "Improved test scores by 25%, achieved 4.8/5 student satisfaction, and reduced tutoring costs by 60% compared to traditional methods.",
    techStack: ["React", "Supabase", "OpenAI", "Tailwind CSS", "Framer Motion"],
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="relative bg-muted/30 overflow-hidden">
      {/* Background elements */}
      <ParallaxShape className="absolute top-20 right-0 w-32 h-32 opacity-20">
        <TriangleShape />
      </ParallaxShape>
      <ParallaxShape className="absolute bottom-32 left-10 w-24 h-24 opacity-15" speed={0.1}>
        <GradientMesh className="w-full h-full" />
      </ParallaxShape>

      <div className="relative z-10">
        {/* Section Label */}
        <div className="container mx-auto px-4">
          <ScrollFade>
            <div className="flex items-center gap-2 pt-section-sm md:pt-section">
              <span className="text-accent text-lg">✱</span>
              <span className="text-overline uppercase tracking-widest text-accent font-semibold">
                PORTFOLIO
              </span>
            </div>
          </ScrollFade>
        </div>

        {/* Gallery Carousel */}
        <Gallery4
          title="Case Studies"
          description="Real-world AI ethics projects showcasing measurable impact in fairness, governance, and responsible technology deployment."
          items={galleryItems}
        />
      </div>
    </section>
  );
};

export default Portfolio;