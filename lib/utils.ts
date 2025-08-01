import { interviewCovers, mappings } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings];
};

// Cache for icon existence checks
const iconCache = new Map<string, boolean>();

const checkIconExists = async (url: string) => {
  // Check cache first
  if (iconCache.has(url)) {
    return iconCache.get(url);
  }

  try {
    const response = await fetch(url, { 
      method: "HEAD",
      cache: "force-cache" // Cache the response
    });
    const exists = response.ok;
    iconCache.set(url, exists);
    return exists;
  } catch {
    iconCache.set(url, false);
    return false;
  }
};

export const getTechLogos = async (techArray: string[]) => {
  // Early return for empty arrays
  if (!techArray || techArray.length === 0) {
    return [];
  }

  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg",
    }))
  );

  return results;
};

// Memoized version for frequently used tech stacks
const techLogoCache = new Map<string, ReturnType<typeof getTechLogos>>();

export const getTechLogosCached = async (techArray: string[]) => {
  const cacheKey = techArray.sort().join(',');
  
  if (techLogoCache.has(cacheKey)) {
    return techLogoCache.get(cacheKey)!;
  }
  
  const result = getTechLogos(techArray);
  techLogoCache.set(cacheKey, result);
  return result;
};
export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};
