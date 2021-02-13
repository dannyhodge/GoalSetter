import { category } from "../types/Category";
import { goal } from "../types/Goal";

export function ReturnCategoryData() : category[] {

    let categories: category[] = [
        { title: "Fitness", id: 0, dateAdded: new Date(-4) },
        { title: "Health", id: 1, dateAdded: new Date(-3)  },
        { title: "Lifestyle", id: 2, dateAdded: new Date(-2)  },
        { title: "Learning", id: 3, dateAdded: new Date(-1)  }
    ]

    return categories;
  }

  export function ReturnGoalData() : goal[]  {

    let goals: goal[] = [
        { title: "Do 20 pushups in 1 set", id: 0, dateAdded: new Date(-8), startValue: 10, endValue: 20, currentValue: 15, categoryId: 0  },
        { title: "Do 15 Chinups in 1 set", id: 1, dateAdded: new Date(-7), startValue: 10, endValue: 15, currentValue: 12, categoryId: 0  },
        { title: "Reach 66kg", id: 2, dateAdded: new Date(-6), startValue: 0, endValue: 10, currentValue: 5, categoryId: 1  },
        { title: "Average 8 hours of sleep a night", id: 3, dateAdded: new Date(-5), startValue: 7.2, endValue: 8, currentValue: 7.5, categoryId: 1  },
        { title: "Read 20 books", id: 4, dateAdded: new Date(-4), startValue: 0, endValue: 20, currentValue: 10, categoryId: 2  },
        { title: "Complete 3 Side Projects", id: 5, dateAdded: new Date(-3), startValue: 0, endValue: 3, currentValue: 0, categoryId: 3  },
        { title: "Learn 3 new skills", id: 6, dateAdded: new Date(-2), startValue: 0, endValue: 3, currentValue: 0, categoryId: 3  }
    ];

    return goals;
  }