class Company {
  final String slug;
  final String name;
  final String sector;
  final String commune;
  final String address;
  final String phone;
  final String email;
  final String? website;
  final String hours;
  final String status; // "Vérifiée" | "À vérifier"
  final String description;
  final List<String> services;
  final String founded;
  final String size;
  final double rating;
  final int reviews;

  const Company({
    required this.slug,
    required this.name,
    required this.sector,
    required this.commune,
    required this.address,
    required this.phone,
    required this.email,
    this.website,
    required this.hours,
    required this.status,
    required this.description,
    required this.services,
    required this.founded,
    required this.size,
    required this.rating,
    required this.reviews,
  });
}

class Opportunity {
  final String id;
  final String title;
  final String companySlug;
  final String company;
  final String type;
  final String domain;
  final String location;
  final String level;
  final String contract;
  final String deadline;
  final String posted;
  final String? salary;
  final String summary;
  final List<String> missions;
  final List<String> profile;
  final String howToApply;

  const Opportunity({
    required this.id,
    required this.title,
    required this.companySlug,
    required this.company,
    required this.type,
    required this.domain,
    required this.location,
    required this.level,
    required this.contract,
    required this.deadline,
    required this.posted,
    this.salary,
    required this.summary,
    required this.missions,
    required this.profile,
    required this.howToApply,
  });
}

class NewsItem {
  final String slug;
  final String source;
  final String sourceType;
  final String title;
  final String category;
  final String date;
  final String time;
  final String summary;
  final List<String> body;

  const NewsItem({
    required this.slug,
    required this.source,
    required this.sourceType,
    required this.title,
    required this.category,
    required this.date,
    required this.time,
    required this.summary,
    required this.body,
  });
}

class PracticalInfo {
  final String slug;
  final String title;
  final String category;
  final String owner;
  final String action;
  final String status;
  final String description;
  final List<String> steps;
  final String? officialUrl;

  const PracticalInfo({
    required this.slug,
    required this.title,
    required this.category,
    required this.owner,
    required this.action,
    required this.status,
    required this.description,
    required this.steps,
    this.officialUrl,
  });
}

class Administration {
  final String name;
  final String commune;
  final String domain;
  final String phone;
  final String hours;

  const Administration({
    required this.name,
    required this.commune,
    required this.domain,
    required this.phone,
    required this.hours,
  });
}
