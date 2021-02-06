import { category } from "../types/Category";
import { goal } from "../types/Goal";

export function ReturnCategoryData() : category[] {

    let categories: category[] = [
        { title: "First 3 goals", id: 0, dateAdded: new Date(-2) },
        { title: "Second 3 goals", id: 1, dateAdded: new Date(-1)  },
        { title: "Last 3 goals", id: 2, dateAdded: new Date()  },
        { title: "empty goals", id: 3, dateAdded: new Date()  },
        { title: "empty goals", id: 4, dateAdded: new Date()  },
        { title: "empty goals", id: 5, dateAdded: new Date()  },
        { title: "empty goals", id: 6, dateAdded: new Date()  }
    ]

    return categories;
  }

  export function ReturnGoalData() : goal[]  {

    let goals: goal[] = [
        { title: "goal 1", id: 0, dateAdded: new Date(-8), startValue: 0, endValue: 10, currentValue: 5, categoryId: 0  },
        { title: "goal 2", id: 1, dateAdded: new Date(-7), startValue: 0, endValue: 10, currentValue: 5, categoryId: 0  },
        { title: "goal 3", id: 2, dateAdded: new Date(-6), startValue: 0, endValue: 10, currentValue: 5, categoryId: 0  },
        { title: "goal 4", id: 3, dateAdded: new Date(-5), startValue: 0, endValue: 10, currentValue: 5, categoryId: 1  },
        { title: "goal 5", id: 4, dateAdded: new Date(-4), startValue: 0, endValue: 10, currentValue: 5, categoryId: 1  },
        { title: "goal 6", id: 5, dateAdded: new Date(-3), startValue: 0, endValue: 10, currentValue: 5, categoryId: 1  },
        { title: "goal 7", id: 6, dateAdded: new Date(-2), startValue: 0, endValue: 10, currentValue: 5, categoryId: 2  },
        { title: "goal 8", id: 7, dateAdded: new Date(-1), startValue: 0, endValue: 10, currentValue: 5, categoryId: 2  },
        { title: "goal 9", id: 8, dateAdded: new Date(), startValue: 0, endValue: 10, currentValue: 5, categoryId: 2  },
    ]

    return goals;
  }